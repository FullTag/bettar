export const verboseLog = (shouldLog = false) => {
  if (shouldLog) {
    return console.log
  } else {
    return () => {}
  }
}
