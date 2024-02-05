module.exports = function (RED) {
    function OpenAIRequestNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        this.openaiUrl = config.openaiUrl;
        this.openaiKey = config.openaiKey;

        node.on('input', function (msg) {
            var axios = require('axios');
            var data = {
                prompt: msg.payload, // assuming the prompt is passed in the payload
            };

            axios.post(node.openaiUrl, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + node.openaiKey
                }
            })
                .then(function (response) {
                    msg.payload = response.data;
                    node.send(msg);
                })
                .catch(function (error) {
                    node.error("Error calling OpenAI: " + error);
                });
        });
    }
    RED.nodes.registerType("llm-request", OpenAIRequestNode);
}
