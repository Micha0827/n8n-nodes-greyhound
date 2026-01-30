FROM n8nio/n8n:latest

USER root

# Copy the built node files
COPY dist /usr/local/lib/node_modules/n8n-nodes-greyhound

# Install the node
RUN cd /usr/local/lib/node_modules/n8n-nodes-greyhound && \
    npm install --production && \
    npm link

USER node

# Set environment variable for custom nodes
ENV N8N_CUSTOM_EXTENSIONS=/usr/local/lib/node_modules
