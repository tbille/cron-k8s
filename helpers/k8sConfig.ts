import { KubeConfig } from "@kubernetes/client-node";

const cluster = {
    name: process.env.K8S_CLUSTER_NAME,
    server: process.env.K8S_CLUSTER_SERVER,
    caData: process.env.K8S_CLUSTER_CADATA
};

const user = {
    name: process.env.K8S_USER_NAME,
    user: {token: process.env.K8S_USER_USER_TOKEN},
};

const context = {
    name: process.env.K8S_CONTEXT_NAME,
    user: user.name,
    cluster: cluster.name,
};

const kubenetesConfig = new KubeConfig();
kubenetesConfig.loadFromOptions({
    clusters: [cluster],
    users: [user],
    contexts: [context],
    currentContext: context.name,
});

export { kubenetesConfig }