

export default function time(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
