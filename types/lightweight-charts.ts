export type DataType = {
  close_price: string,
  high_price: string,
  low_price: string,
  open_price: string,
  time_frame: number,
  timestamp: number,
  tool_market: string,
  tool_name: string,
  volume: string
}

export type FormatDataType = {
  time: string,
  open: number,
  high: number,
  low:  number,
  close: number,
}

export type TimeframeType = 60 | 300 | 900 | 3600 | 86400;