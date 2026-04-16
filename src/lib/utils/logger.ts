// Optional colors for terminal output
const colors = {
    reset: "\x1b[0m",
    info: "\x1b[32m", // green
    warn: "\x1b[33m", // yellow
    error: "\x1b[31m", // red
    request: "\x1b[36m", // cyan
    response: "\x1b[34m", // blue
};

function formatMessage(level: string, message: string, color: string) {
    // Format: [2026-04-10 12:00]
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);
    return `${color}[${level}] [${timestamp}] ${message}${colors.reset}`;
}

export function logInfo(message: string, data?: unknown) {
    console.log(formatMessage("INFO", message, colors.info));
    if (data !== undefined) {
        console.log(JSON.stringify(data, null, 2));
    }
}

export function logError(message: string, error?: unknown) {
    console.error(formatMessage("ERROR", message, colors.error));
    if (error) {
        if (error instanceof Error) {
            console.error(colors.error + error.stack + colors.reset);
        } else {
            console.error(colors.error + JSON.stringify(error, null, 2) + colors.reset);
        }
    }
}

export function logRequest(method: string, url: string) {
    console.log(formatMessage("REQUEST", `${method} ${url}`, colors.request));
}

export function logResponse(status: number, url: string, duration: number) {
    const color = status >= 500 ? colors.error : status >= 400 ? colors.warn : colors.response;
    console.log(formatMessage("RESPONSE", `[${status}] ${url} - ${duration}ms`, color));
}
