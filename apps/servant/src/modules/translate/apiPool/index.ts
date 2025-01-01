import { singleton } from '@/utils';
import { Language } from '@/utils';
import 'dotenv/config';

// api
import baiduTransApi from './baidu';
import tencentTransApi from './tencent';
import aLiTransApi from './ali';
import huaweiTransApi from './huawei';
import niuTransApi from './niu';
import douyinTransApi from './douyin';

const pool = [douyinTransApi, aLiTransApi, niuTransApi, huaweiTransApi, tencentTransApi, baiduTransApi];

type TranslateType = {
    q: string;
    to: Language;
    retry: boolean;
    resolve: (res: string) => void;
    reject?: (error: Error) => void;
};

class TransApiPool {
    queue: TranslateType[] = [];

    async translate(q: string, to: Language): Promise<string> {
        return new Promise((resolve, reject) => {
            this.push({
                q,
                to,
                resolve,
                reject,
                retry: true,
            });
        });
    }

    push(task: TranslateType) {
        this.queue.push(task);

        this.executeTask();
    }

    async executeTask() {
        while (this.queue.length > 0) {
            const taskItem = this.queue.shift();

            for (let i = 0; i < pool.length; i++) {
                const api = pool[i];
                if (api.isAvailable) {
                    const { success, text } = await api.translate(taskItem.q, taskItem.to);

                    if (success) {
                        taskItem.resolve(text);
                        break;
                    } else {
                        if (taskItem.retry) {
                            taskItem.retry = false;
                            this.push(taskItem);
                        } else {
                            taskItem.reject(new Error(text));
                        }
                    }
                    this.executeTask();
                }
            }
        }
    }

    get pool() {
        return pool;
    }
}

export default singleton(TransApiPool);
