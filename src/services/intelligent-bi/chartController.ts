// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addChart POST /api/chart/add */
export async function addChartUsingPOST(
  body: API.ChartAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/chart/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteChart POST /api/chart/delete */
export async function deleteChartUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/chart/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** genChartByAi POST /api/chart/genChart */
export async function genChartByAiUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.genChartByAiUsingPOSTParams,
  body: {},
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      formData.append(
        ele,
        typeof item === 'object' && !(item instanceof File) ? JSON.stringify(item) : item,
      );
    }
  });

  return request<API.BaseResponseBIResponse_>('/api/chart/genChart', {
    method: 'POST',
    params: {
      ...params,
    },
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** genChartByAiAsync POST /api/chart/genChart/async */
export async function genChartByAiAsyncUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.genChartByAiAsyncUsingPOSTParams,
  body: {},
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      formData.append(
        ele,
        typeof item === 'object' && !(item instanceof File) ? JSON.stringify(item) : item,
      );
    }
  });

  return request<API.BaseResponseBIResponse_>('/api/chart/genChart/async', {
    method: 'POST',
    params: {
      ...params,
    },
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** getChartVoById GET /api/chart/get */
export async function getChartVoByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getChartVoByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseChartVO_>('/api/chart/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listChartVoByPage POST /api/chart/list/chart */
export async function listChartVoByPageUsingPOST(
  body: API.ChartQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageChartVO_>('/api/chart/list/chart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateChart POST /api/chart/update */
export async function updateChartUsingPOST(
  body: API.ChartUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/chart/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
