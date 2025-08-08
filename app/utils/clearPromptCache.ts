import redis from "../lib/redis";

export async function clearPromptCache() {
  const keys = await redis.keys("prompts:page:*:size:*");
  if (keys.length > 0) {
    await redis.del(keys);
  }
}
