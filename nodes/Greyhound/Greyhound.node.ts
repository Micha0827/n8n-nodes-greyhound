import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestMethods,
} from 'n8n-workflow';

export class Greyhound implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'GREYHOUND',
		name: 'greyhound',
		icon: 'file:greyhound.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'Interact with GREYHOUND REST API',
		defaults: {
			name: 'GREYHOUND',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'greyhoundApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Colors',
						value: 'colors',
					},
					{
						name: 'Items',
						value: 'items',
					},
				],
				default: 'colors',
			},
			// Colors Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['colors'],
					},
				},
				options: [
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all colors',
						action: 'Get all colors',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a single color by ID',
						action: 'Get a color',
					},
				],
				default: 'getAll',
			},
			{
				displayName: 'Color ID',
				name: 'colorId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['colors'],
						operation: ['get'],
					},
				},
				default: '',
				description: 'The ID of the color to retrieve',
			},
			// Items Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['items'],
					},
				},
				options: [
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all items',
						action: 'Get all items',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a single item by ID',
						action: 'Get an item',
					},
				],
				default: 'getAll',
			},
			{
				displayName: 'Item ID',
				name: 'itemId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['items'],
						operation: ['get'],
					},
				},
				default: '',
				description: 'The ID of the item to retrieve',
			},
			// Additional Options for Colors
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['colors'],
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'Offset',
						name: 'offset',
						type: 'number',
						typeOptions: {
							minValue: 0,
						},
						default: 0,
						description: 'Number of results to skip (API returns 101 results by default)',
					},
				],
			},
			// Additional Options for Items
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['items'],
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'Color IDs',
						name: 'colorIds',
						type: 'string',
						default: '',
						placeholder: '1,2,3 or 1',
						description: 'Filter items by color IDs (comma-separated integers)',
					},
					{
						displayName: 'Offset',
						name: 'offset',
						type: 'number',
						typeOptions: {
							minValue: 0,
						},
						default: 0,
						description: 'Number of results to skip (API returns 101 results by default)',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const credentials = await this.getCredentials('greyhoundApi');

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;
				const baseUrl = credentials.baseUrl as string;
				const username = credentials.username as string;
				const password = credentials.password as string;

				let endpoint = '';
				let method: IHttpRequestMethods = 'GET';
				const qs: { [key: string]: string | number } = {};

				// Build endpoint based on resource and operation
				if (resource === 'colors') {
					if (operation === 'getAll') {
						endpoint = '/colors';
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as {
							offset?: number;
						};

						// Add offset if provided
						if (additionalFields.offset) {
							qs.offset = additionalFields.offset;
						}
					} else if (operation === 'get') {
						const colorId = this.getNodeParameter('colorId', i) as string;
						endpoint = `/colors/${colorId}`;
					}
				} else if (resource === 'items') {
					if (operation === 'getAll') {
						endpoint = '/items';
						method = 'GET';

						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as {
							colorIds?: string;
							offset?: number;
						};

						// Build filter object for query parameter
						const filter: { ColorRefs?: number[] } = {};

						// Add color filter if provided
						if (additionalFields.colorIds) {
							// Parse comma-separated IDs to integer array
							const colorIdsArray = additionalFields.colorIds
								.split(',')
								.map(id => parseInt(id.trim(), 10))
								.filter(id => !isNaN(id));

							if (colorIdsArray.length > 0) {
								filter.ColorRefs = colorIdsArray;
							}
						}

						// Add filter as JSON string to query params if present
						if (Object.keys(filter).length > 0) {
							qs.filter = JSON.stringify(filter);
						}

						// Add offset if provided
						if (additionalFields.offset) {
							qs.offset = additionalFields.offset;
						}
					} else if (operation === 'get') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						endpoint = `/items/${itemId}`;
					}
				}

				// Build auth header
				const authString = Buffer.from(`${username}:${password}`).toString('base64');

				// Make request
				const options = {
					method,
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: `Basic ${authString}`,
					},
					uri: `${baseUrl}${endpoint}`,
					qs,
					json: true,
				};

				const response = await this.helpers.request(options);

				// Handle response
				if (Array.isArray(response)) {
					response.forEach((item) => {
						returnData.push({
							json: item,
							pairedItem: i,
						});
					});
				} else {
					returnData.push({
						json: response,
						pairedItem: i,
					});
				}
			} catch (error) {
				if (this.continueOnFail()) {
					const errorMessage = error instanceof Error ? error.message : 'Unknown error';
					returnData.push({
						json: {
							error: errorMessage,
						},
						pairedItem: i,
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
