# axios封装

```ts
declare module 'axios' {    
interface AxiosResponse<T = any> {        
    code: number;        
    message: string;        
    // 这里追加你的接口参数    
    }   
    export function create(config?: AxiosRequestConfig): AxiosInstance;
}
```