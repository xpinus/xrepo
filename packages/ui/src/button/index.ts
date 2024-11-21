import { withInstall } from '../utils';
import _Button from './src/button.vue';

export const Button = withInstall(_Button);
export default Button;

declare module 'vue' {
    export interface GlobalComponents {
        VanButton: typeof Button;
    }
}