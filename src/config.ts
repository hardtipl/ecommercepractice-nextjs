import nodeConfig from 'config';
console.log("Current environement", nodeConfig.util.getEnv('NODE_ENV'))
interface Config {
    /** Whether assets should be cached or not. */
    dblink: string;

    /** The port that the express server should bind to. */
    port: number;

    /** Secreat key for Json webtoken. */
    secreatkey:string
}

const config: Config = {
    dblink: nodeConfig.get<string>('dblink'),
    port: nodeConfig.get<number>('port'),
    secreatkey:nodeConfig.get<string>('tokenkey'),
};

export default config;