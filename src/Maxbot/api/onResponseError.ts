interface ResultError {
  status: number
  msg: string
  response?: any
}

export async function onResponseError(error: any): Promise<ResultError> {
  const response = error && error.response
  const statusHttp = response && parseInt(response.status, 10)

  const result: ResultError = {
    status: 0,
    msg: 'Timeout',
    response: (response && response.data) || false
  }

  if (!response) return Promise.resolve(result)

  result.msg = `httpError ${statusHttp}`
  return Promise.resolve(result)
}
