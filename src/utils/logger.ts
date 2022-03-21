/* eslint-disable no-console,consistent-return */
// noinspection SpellCheckingInspection

import chalk from 'chalk';

// eslint-disable-next-line no-shadow
export enum Loglevels {
  Debug,
  Info,
  Warn,
  Error,
  Fatal,
}

const prefixes = new Map<Loglevels, string>([
  [Loglevels.Debug, 'DEBUG'],
  [Loglevels.Info, 'INFO'],
  [Loglevels.Warn, 'WARN'],
  [Loglevels.Error, 'ERROR'],
  [Loglevels.Fatal, 'FATAL'],
]);

const noColor: (str: string) => string = (msg) => msg;

type colorFunction = (str: string) => string

const colorFunctions = new Map<Loglevels, colorFunction>([
  [Loglevels.Debug, chalk.gray],
  [Loglevels.Info, chalk.cyan],
  [Loglevels.Warn, chalk.yellow],
  [Loglevels.Error, (str: string) => chalk.red(str)],
  [Loglevels.Fatal, (str: string) => chalk.red(chalk.bold(chalk.italic(str)))],
]);

export function logger({
  logLevel = Loglevels.Info,
  name,
}: {
  logLevel?: Loglevels;
  name?: string;
} = {}) {
  function log(level: Loglevels, ...args: string[]) {
    if (level < logLevel) return;

    let color = colorFunctions.get(level);
    if (!color) color = noColor;

    const date = new Date();
    const logLine = [
      `[${date.toLocaleDateString()} ${date.toLocaleTimeString()}]`,
      color(prefixes.get(level) || 'DEBUG'),
      name ? `${name} >` : '>',
      ...args,
    ];

    switch (level) {
      case Loglevels.Debug:
        return console.debug(...logLine);
      case Loglevels.Info:
        return console.info(...logLine);
      case Loglevels.Warn:
        return console.warn(...logLine);
      case Loglevels.Error:
        return console.error(...logLine);
      case Loglevels.Fatal:
      default:
        return console.log(...logLine);
    }
  }

  function setLevel(level: Loglevels) {
    // eslint-disable-next-line no-param-reassign
    logLevel = level;
  }

  function debug(...args: string[]) {
    log(Loglevels.Debug, ...args);
  }

  function info(...args: string[]) {
    log(Loglevels.Info, ...args);
  }

  function warn(...args: string[]) {
    log(Loglevels.Warn, ...args);
  }

  function error(...args: string[]) {
    log(Loglevels.Error, ...args);
  }

  function fatal(...args: string[]) {
    log(Loglevels.Fatal, ...args);
  }

  return {
    log,
    setLevel,
    debug,
    info,
    warn,
    error,
    fatal,
  };
}

const log = logger();
export default log;
