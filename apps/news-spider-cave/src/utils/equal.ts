import { timingSafeEqual } from "node:crypto";

/**
 * 安全比较两个字符串（防止时序攻击）
 */
export function safeCompare(a: string, b: string) {
    if (a.length !== b.length) return false;

    try {
        // 将字符串转换为Buffer，确保编码一致
        const bufA = Buffer.from(a, "utf8");
        const bufB = Buffer.from(b, "utf8");

        // 如果长度不同，直接返回false（但要确保处理时间不受输入影响）
        if (bufA.length !== bufB.length) {
            // 使用固定长度的比较以确保时间恒定
            timingSafeEqual(Buffer.alloc(0), Buffer.alloc(0));
            return false;
        }

        // 长度相同，使用timingSafeEqual比较
        return timingSafeEqual(bufA, bufB);
    } catch (err) {
        // 如果出现错误（如参数不是字符串），返回false
        return false;
    }
}
