import { Plugin } from 'vite';
type FnType = (url: string) => Plugin;
declare const proxy: FnType;
export default proxy;
