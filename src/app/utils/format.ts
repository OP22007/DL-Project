export function formatLargeNumber(num: number): string {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T'
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B'
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M'
    return num.toString()
  }
  
  export function formatVolume(num: number): string {
    return num.toLocaleString('en-US', { maximumFractionDigits: 0 })
  }
  
  