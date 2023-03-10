
import { ColumnProps } from "./store";
import fitUrlImg from './assets/column.jpg'

export function generateFitUrl(column: ColumnProps, width: number, height: number) {
  if (column.avatar) {
    column.avatar.fitUrl = column.avatar.url

  } else {
    column.avatar = {
      fitUrl: fitUrlImg
    }
  }
}

interface CheckCondition {
  format?: string[]
  size?: number
}


type ErrorType = 'size' | 'format' | null

export function beforeUploadCheck(file: File, condition: CheckCondition) {
  const { format, size } = condition
  const isValidFormat = format ? format.includes(file.type) : true
  const isValidSize = size ? (file.size / 1024 / 1024 < size) : true

  let error: ErrorType = null
  if(!isValidFormat)error = 'format'
  if (!isValidSize) {
    error = 'size'
  }
  return {
    passed: isValidSize && isValidFormat,
    error
  }
}

