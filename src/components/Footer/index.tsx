import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';
const Footer: React.FC = () => {
  const defaultMessage = 'ChangYeChannel';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Intelligent BI Pro',
          title: 'Intelligent BI Backend',
          href: 'https://github.com/ChangYeChannel/intelligent-bi-backend',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/ChangYeChannel',
          blankTarget: true,
        },
        {
          key: 'Intelligent BI',
          title: 'Intelligent BI',
          href: 'https://github.com/ChangYeChannel/intelligent-bi-frontend',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
