import {UploadOutlined} from '@ant-design/icons';
import {Button, Card, Form, Input, message, Select, Space, Upload} from 'antd';
import React, {useState} from 'react';
import TextArea from "antd/es/input/TextArea";
import {genChartByAiAsyncUsingPOST, genChartByAiUsingPOST} from "@/services/intelligent-bi/chartController";
import {useForm} from "rc-field-form";

/**
 * 添加图表页面（异步）
 * @constructor
 */
const AddChartAsync: React.FC = () => {
  //方便表单清空
  const [form] = useForm();

  //设置加载submitting
  const [submitting,setSubmitting] = useState<boolean>(false)

  //提交表单方法
  const onFinish = async (values: any) => {
    //如果当前是正在提交中，就直接返回，避免重复提交
    if (submitting) {
      return;
    }
    setSubmitting(true);


    //上传表单数据到后台接口\
    const params = {
      ...values,
      file: undefined,
    };

    try {
      const res = await genChartByAiAsyncUsingPOST(params, {}, values.file.file.originFileObj)
      if (!res?.data) {
        message.error("分析失败！")
      }else {
        //给出提示语
        message.success("分析任务提交成功，稍后请再“我的图表”页面查看分析结果！");
        //清空表单页面
        form.resetFields();
      }
    } catch (e : any) {
      message.error("分析失败！")
    }

    setSubmitting(false);

  };

  return (
    <div className="add_chart_async">

      <Card title={"智能分析"}>
        <Form name="addChart" onFinish={onFinish} initialValues={{}} wrapperCol={{span:16}} labelCol={{span:4}} labelAlign={"left"}>
          <Form.Item name="goal" label="分析目标" rules={[{required: true, message: '请输入分析目标'}]}>
            <TextArea placeholder={"请输入你的分析诉求，比如：分析网站的用户增长情况"}/>
          </Form.Item>

          <Form.Item name="chartName" label="图表名称">
            <Input placeholder={"请输入图表名称"}/>
          </Form.Item>

          <Form.Item
            name="chartType"
            label="图表类型"
          >
            <Select options={[
              { value: '折线图', label: '折线图' },
              { value: '柱状图', label: '柱状图' },
              { value: '堆叠图', label: '堆叠图' },
              { value: '饼图', label: '饼图' },
              { value: '雷达图', label: '雷达图' },
            ]}>
            </Select>
          </Form.Item>

          <Form.Item
            name="file"
            label="原始数据"
          >
            <Upload name="file" maxCount={1}>
              <Button icon={<UploadOutlined/>}>上传Excel文件</Button>
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{span: 16, offset: 4}}>
            <Space>
              <Button type="primary" htmlType="submit" loading={submitting} disabled={submitting} >
                提交
              </Button>
              <Button htmlType="reset">重置</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

    </div>
  );
};
export default AddChartAsync;
