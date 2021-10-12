const FormatCommentText = (length: number) => {
  if (length === 0) return ` comments`
  if (length === 1) return ` comment`
  return ` comments`
}

export default FormatCommentText
