import { Client } from 'discord.js';
import { DEV_GUILD_ID } from '../config';

/**
 * Upsert all commands tagged with devOnly to the given Development Guild.
 * @param bot The client instance.
 */
export async function updateDevCommands(bot: Client): Promise<void> {
  if (!DEV_GUILD_ID) return;

  const cmds =
}
