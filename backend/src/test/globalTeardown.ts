export default async function globalTeardown(): Promise<void> {
  if (global.__MONGOINSTANCE) {
    await global.__MONGOINSTANCE.stop()
  }
}
