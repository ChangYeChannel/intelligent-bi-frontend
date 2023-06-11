import { useModel } from '@@/exports';
import {Avatar, Card, Divider, List, message, Result} from 'antd';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';
import Search from "antd/es/input/Search";
import {listChartVoByPageUsingPOST} from "@/services/intelligent-bi/chartController";

/**
 * 我的图表页面
 * @constructor
 */
const MyChartPage: React.FC = () => {
  //初始化查询参数
  const initSearchParams = {
    current: 1,
    pageSize: 4,
    sortField: 'create_time',
    sortOrder: 'desc'
  };

  //初始化查询参数（加载页面数据）
  const [searchParams, setSearchParams] = useState<API.ChartQueryRequest>({ ...initSearchParams });
  //获取当前登录用户
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};
  //图表分页列表数据
  const [chartList, setChartList] = useState<API.ChartVO[]>();
  //图表分页条数数据
  const [total, setTotal] = useState<number>(0);
  //加载状态
  const [loading, setLoading] = useState<boolean>(true);

  //加载页面数据
  const loadData = async () => {
    //设置页面加载状态
    setLoading(true);

    try {
      //请求后端
      const res = await listChartVoByPageUsingPOST(searchParams);
      if (res.data) {
        //装入数据
        setChartList(res.data.records ?? []);
        setTotal(res.data.total ?? 0);

        //隐藏图表的 title
        if (res.data.records) {
          res.data.records.forEach(data => {

            if (data.status === "succeed") {
              const chartOption = JSON.parse(data.generateChart ?? '{}');
              //设置标题为空
              chartOption.title = undefined;
              data.generateChart = JSON.stringify(chartOption);
            }


          })
        }
      } else {
        message.error('获取图表列表失败');
      }
    } catch (e: any) {
      message.error('获取图表列表失败，' + e.message);
    }

    //设置页面加载状态
    setLoading(false);
  };

  //钩子函数，页面加载时触发，页面搜索栏改动时触发
  useEffect(() => {
    loadData().then(() => {});
  }, [searchParams]);

  return (
    <div className="my-chart-page">
      <div>

        {/*查询条件*/}
        <Search placeholder="请输入图表名称" enterButton loading={loading} onSearch={(value) => {
          //设置查询条件
          setSearchParams({
            ...initSearchParams,
            chartName: value,
          })
        }}/>
      </div>

      <Divider></Divider>

      {/*列表界面*/}
      <List
        //设置一行展示列数（可以设置每列宽度，以及在屏幕尺寸不同的时候自动一行展示多少列数据）
        grid={{gutter: 16, xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 2,}}
        pagination={{
          onChange: (page, pageSize) => {
            setSearchParams({
              ...searchParams,
              current: page,
              pageSize,
            })
          },
          current: searchParams.current,
          pageSize: searchParams.pageSize,
          total: total,
        }}
        loading={loading}
        dataSource={chartList}
        renderItem={(item) => (

          // 列表项
          <List.Item key={item.id}>

            <Card style={{ width: '100%' }}>

              <List.Item.Meta
                avatar={<Avatar src={currentUser && currentUser.userAvatar} />}
                title={item.chartName}
                description={item.chartType ? '图表类型：' + item.chartType : undefined}
              />
              <>
                {
                  item.status === "wait" && <>
                    <Result
                      status="warning"
                      title="待生成"
                      subTitle={item.execMessage ?? '当前图表生成队列繁忙，请耐心等候'}
                    />
                  </>
                }

                {
                  item.status === "running" && <>
                    <Result
                      status="warning"
                      title="生成中"
                      subTitle={item.execMessage ?? '图表生成中，正在拉起AI分析能力，请稍候'}
                    />
                  </>
                }

                {
                  item.status === "succeed" && <>
                    <div style={{ marginBottom: 16 }} />
                    <p>{'分析目标：' + item.goal}</p>
                    <div style={{ marginBottom: 16 }} />
                    <ReactECharts option={item.generateChart && JSON.parse(item.generateChart)} />
                  </>
                }

                {
                  item.status === "failed" && <>
                    <Result
                      status="error"
                      title="生成失败"
                      subTitle={item.execMessage}
                    />
                  </>
                }
              </>
            </Card>
          </List.Item>

        )}
      />
    </div>
  );
};
export default MyChartPage;
