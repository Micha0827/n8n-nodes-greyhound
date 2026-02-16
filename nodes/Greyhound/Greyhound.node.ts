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
						name: 'Groups',
						value: 'groups',
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
			// Groups Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['groups'],
					},
				},
				options: [
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all groups',
						action: 'Get all groups',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a single group by ID',
						action: 'Get a group',
					},
				],
				default: 'getAll',
			},
			{
				displayName: 'Group ID',
				name: 'groupId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['groups'],
						operation: ['get'],
					},
				},
				default: '',
				description: 'The ID of the group to retrieve',
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
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new item (e.g., email)',
						action: 'Create an item',
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
			// Item Fields for Create
			{
				displayName: 'GroupRef',
				name: 'groupRef',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['items'],
						operation: ['create'],
					},
				},
				default: '',
				placeholder: '42',
				description: 'Group reference ID (required)',
			},
			{
				displayName: 'Subject',
				name: 'subject',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['items'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Subject of the item',
			},
			{
				displayName: 'From',
				name: 'from',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['items'],
						operation: ['create'],
					},
				},
				default: '',
				placeholder: 'Name <email@example.com>',
				description: 'Sender address (e.g., "John <john@example.com>")',
			},
			{
				displayName: 'Recipients',
				name: 'recipients',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['items'],
						operation: ['create'],
					},
				},
				default: '',
				placeholder: 'Name <email@example.com>',
				description: 'Recipient addresses (comma-separated for multiple)',
			},
			{
				displayName: 'Email Content (HTML)',
				name: 'emailContent',
				type: 'string',
				typeOptions: {
					rows: 5,
				},
				displayOptions: {
					show: {
						resource: ['items'],
						operation: ['create'],
					},
				},
				default: '',
				placeholder: '<html><body>Your message</body></html>',
				description: 'HTML content for email',
			},
			{
				displayName: 'State',
				name: 'state',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['items'],
						operation: ['create'],
					},
				},
				default: 3,
				description: 'State of the item (default: 3)',
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['items'],
						operation: ['create'],
					},
				},
				default: 2,
				description: 'Priority of the item (default: 2)',
			},
			{
				displayName: 'Flags',
				name: 'flags',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['items'],
						operation: ['create'],
					},
				},
				default: 8256,
				description: 'Flags for the item (default: 8256)',
			},
			{
				displayName: 'Number',
				name: 'number',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['items'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Custom number for the item',
			},
			{
				displayName: 'ColorRef',
				name: 'colorRef',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['items'],
						operation: ['create'],
					},
				},
				default: 0,
				description: 'Color reference ID',
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
						displayName: 'List Values',
						name: 'listValues',
						type: 'multiOptions',
						default: [],
						description: 'Select fields to return. Value is the sum of selected flags.',
						options: [
							{ name: 'groupRef', value: 1 },
							{ name: 'groupName', value: 2 },
							{ name: 'groupPath', value: 4 },
							{ name: 'userRef', value: 8 },
							{ name: 'userName', value: 16 },
							{ name: 'topicRef', value: 32 },
							{ name: 'topicName', value: 64 },
							{ name: 'topicPath', value: 128 },
							{ name: 'colorRef', value: 256 },
							{ name: 'colorCode', value: 512 },
							{ name: 'colorName', value: 1024 },
							{ name: 'state', value: 2048 },
							{ name: 'kind', value: 4096 },
							{ name: 'priority', value: 8192 },
							{ name: 'flags', value: 16384 },
							{ name: 'classified', value: 32768 },
							{ name: 'from', value: 65536 },
							{ name: 'recipients', value: 131072 },
							{ name: 'subject', value: 262144 },
							{ name: 'number', value: 524288 },
							{ name: 'size', value: 1048576 },
							{ name: 'taskProgress', value: 2097152 },
							{ name: 'taskPercent', value: 4194304 },
							{ name: 'taskDone', value: 8388608 },
							{ name: 'startDate', value: 16777216 },
							{ name: 'endDate', value: 33554432 },
							{ name: 'remind', value: 67108864 },
							{ name: 'nextWorkflow', value: 134217728 },
							{ name: 'created', value: 268435456 },
							{ name: 'modified', value: 536870912 },
							{ name: 'viewData', value: 1073741824 },
							{ name: 'attachments', value: 2147483648 },
						],
					},
					{
						displayName: 'ColorRefs',
						name: 'colorIds',
						type: 'string',
						default: '',
						placeholder: '1,2,3',
						description: 'Filter items by color IDs (comma-separated)',
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
				const qs: { [key: string]: string | number | object } = {};

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
				} else if (resource === 'groups') {
					if (operation === 'getAll') {
						endpoint = '/groups';
					} else if (operation === 'get') {
						const groupId = this.getNodeParameter('groupId', i) as string;
						endpoint = `/groups/${groupId}`;
					}
				} else if (resource === 'items') {
					if (operation === 'getAll') {
						endpoint = '/items';
						method = 'GET';

						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as {
							colorIds?: string;
							offset?: number;
							listValues?: number[];
						};

						// Calculate listValues sum if provided
						if (additionalFields.listValues && additionalFields.listValues.length > 0) {
							qs.listValues = additionalFields.listValues.reduce((sum, val) => sum + val, 0);
						}

						// Build filter object for query parameter
						const filter: { ColorRefs?: number[] } = {};

						// Add color filter if provided
						if (additionalFields.colorIds) {
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
					} else if (operation === 'create') {
						endpoint = '/items';
						method = 'POST';

						// Get item fields
						const groupRef = parseInt(this.getNodeParameter('groupRef', i) as string, 10);
						const subject = this.getNodeParameter('subject', i) as string;
						const from = this.getNodeParameter('from', i) as string;
						const recipients = this.getNodeParameter('recipients', i) as string;
						const emailContent = this.getNodeParameter('emailContent', i) as string;
						const state = this.getNodeParameter('state', i, 3) as number;
						const priority = this.getNodeParameter('priority', i, 2) as number;
						const flags = this.getNodeParameter('flags', i, 8256) as number;
						const colorRef = this.getNodeParameter('colorRef', i, 0) as number;
						const number = this.getNodeParameter('number', i, '') as string;

						// Build recipients array
						const recipientsList = recipients.split(',').map(r => ({
							Text: r.trim(),
						}));

						// Build the item payload
						const itemPayload: { [key: string]: any } = {
							GroupRef: groupRef,
							Subject: subject,
							State: state,
							Priority: priority,
							Flags: flags,
							From: {
								Text: from,
							},
							Recipients: recipientsList,
						};

						// Add number if provided
						if (number) {
							itemPayload.Number = number;
						}

						// Add color if provided
						if (colorRef > 0) {
							itemPayload.ColorRef = colorRef;
						}

						// Add email content if provided
						if (emailContent) {
							itemPayload.Properties = {
								Email: {
									EditorData: emailContent,
								},
							};
						}

						// Store body for later
						qs.body = {
							Item: itemPayload,
						};
					}
				}

				// Build auth header
				const authString = Buffer.from(`${username}:${password}`).toString('base64');

				// Make request
				const requestOptions: { [key: string]: any } = {
					method,
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: `Basic ${authString}`,
					},
					uri: `${baseUrl}${endpoint}`,
					json: true,
				};

				// Add qs for GET requests, body for POST
				if (method === 'GET' && Object.keys(qs).length > 0) {
					requestOptions.qs = qs;
				} else if (method === 'POST' && qs.body) {
					requestOptions.body = qs.body;
				}

				const response = await this.helpers.request(requestOptions);

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
