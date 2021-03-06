/* eslint-disable react/no-unused-state */
// TODO: state.content 本组件没有使用, 但是 ./index.js 中使用了
/**
 * StaticTextEditor.js
 * 本质上 RichTextEditor 是不受控的, 之前这里写错了, 一直没有更新 content 但是 编辑器里面还是有值
 * @date 2018-12-25
 * @author WY yang.wang06@hand-china.com
 * @copyright Copyright (c) 2018, Hand
 */

import React from 'react';
import { Form } from 'hzero-ui';
import { Bind } from 'lodash-decorators';
import uuid from 'uuid/v4';

import RichTextEditor from 'components/RichTextEditor';

@Form.create({ fieldNameProp: null })
export default class StaticTextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.staticTextEditor = React.createRef();
    this.state = {
      prevContent: props.content,
      content: props.content, // 编辑器内容
      // prevContent: '', // 保存用来比较编辑内容是否改变
      editorKey: uuid(),
    };
  }

  componentDidMount() {
    const { onRef } = this.props;
    onRef(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { content } = nextProps;
    if (content !== prevState.prevContent) {
      return {
        content: content || '',
        prevContent: content || '',
        editorKey: uuid(),
      };
    }
    return null;
  }

  render() {
    const { disabled } = this.props;
    const { editorKey, prevContent } = this.state;
    return (
      <RichTextEditor
        key={editorKey}
        ref={this.staticTextEditor}
        readOnly={disabled}
        content={prevContent}
      />
    );
  }

  @Bind()
  handleEditChange(dataSource) {
    this.setState({
      content: dataSource,
    });
  }
}
