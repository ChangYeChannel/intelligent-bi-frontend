# 项目介绍

- o.O
- 智能BI平台-前端项目
- 具体项目介绍看后端文档，xixi

# 技术栈

- 前端：React、Umi@4、Ant Design Pro、Echarts
- 后端：SpringBoot、Mysql、MyBaties、RabbitMQ、AI接口、Easy Excel、Swagger + Knife4j、Hutool工具库

### 项目开发记录（没有完结就是持续踩坑中 ）T.T ...

- Umi@4新坑，在 **app.tsx / request** （[app.tsx](src%2Fapp.tsx)）修改前端统一请求地址  
`由 baseUrl 改为 baseURL`
- 在 **app.tsx / request** （[app.tsx](src%2Fapp.tsx)）为前端请求开启cookie状态保留
- 在[requestErrorConfig.ts](src%2FrequestErrorConfig.ts)中删除每次请求都会携带的token字段
- 使用ECharts进行图表展示的时候，默认使用的是JSON数据，不可以直接将AI生成的ECharts的JS代码装入，需要在AI预设层面进行修改
- 需要二次刷新才能显示对应头像的BUG
