import React, { Fragment } from 'react'
import ReactDOMServer from 'react-dom/Server'

import createReactClass from 'create-react-class'

import Immutable, { Map, List } from 'immutable'

import ReactMarkdown from 'react-markdown'

import MarkdownContainers from 'remark-containers'

// import {
//   ListItemTopBar,
//   ObjectWidgetTopBar,
//   colors,
//   lengths,
// } from 'netlify-cms-ui-default'
import {
  TYPES_KEY,
  getTypedFieldForValue,
  resolveFieldKeyType,
  getErrorMessageForTypedFieldAndValue,
} from './typedListHelpers'
// import { List, Map, fromJS } from 'immutable'

//this widget is a container for inserting new content blocks horizontally, that will share equal space

//thanks to: https://www.softwire.com/insights/implementing-a-custom-netlify-cms-widget/

export default function ColumnWidgetMaker(CMS) {
  return {
    Control: class ColumnWidgetControl extends React.Component {
      constructor(props) {
        super(props)
        this.listWidget = React.createRef()
      }

      convertValue(value) {
        console.log('AAA')
        console.log(value)
        // const test = (
        //   <ReactMarkdown
        //     plugins={[[MarkdownContainers, null]]}
        //     allowedTypes={['row', 'column']}
        //     renderers={{
        //       row: props => <div>{props.children}</div>,
        //       column: props => <div className="coluna">{props.children}</div>,
        //     }}
        //     source={value}
        //   />
        // )
        // console.log(test)
        // console.log(ReactDOM.render(test, null))
        const auxList = []
        const markdownComponent = (
          <ReactMarkdown
            plugins={[[MarkdownContainers, null]]}
            // allowedTypes={[]}
            renderers={{
              row: props => {
                console.log('dentro do row:')
                console.log(props.children)
                auxList.push(props.children)
                return <div>{props.children}</div>
              },
              column: props => {
                console.log('dentro do column:')
                console.log(props.children)
                return <span>{props.children}</span>
              },
            }}
            source={value}
          />
        )

        const rendered = ReactDOMServer.renderToString(markdownComponent)
        console.log(rendered)
        console.log(auxList)
        return value
      }

      onListChange = (list, metadata) => {
        console.log(list)
        console.log(list.toJS())
        const convertedList = list
          .toJS()
          .map(row => `::: row\n${row || ''}\n:::`)
        console.log(convertedList)
        this.props.onChange(convertedList.join('\n'), metadata)
      }

      render() {
        const {
          forID,
          field,

          classNameWrapper,
          setActiveStyle,
          setInactiveStyle,
        } = this.props

        const value = this.convertValue(this.props.value)

        // const handleChange = e => {
        //   props.onChange()
        // }

        // const handleAddType = () => {}

        const MarkdownControl = CMS.getWidget('markdown').control
        const ListControl = CMS.getWidget('list').control

        let rows = []

        const RowComponent = props => {
          props.rows.push(props.children)
          return <>{props.children}</>
        }

        const ColumnComponent = props => {
          return <>{props.children}</>
        }

        return (
          <div
            id={forID}
            className={classNameWrapper}
            onFocus={setActiveStyle}
            onBlur={setInactiveStyle}
          >
            {/* <ReactMarkdown
              plugins={[[MarkdownContainers, null]]}
              allowedTypes={[]}
              renderers={{
                row: () => <RowComponent rows={rows} />,
                column: () => <ColumnComponent />,
              }}
              source={value}
            /> */}
            {/* {value} */}
            {rows}
            <ListControl
              {...this.props}
              ref={this.listWidget}
              value={Immutable.fromJS(rows)}
              onChange={this.onListChange}
              field={Immutable.fromJS({
                name: 'rows' + forID,
                label: 'rows',
                collapsed: false,
                field: {
                  label: 'mkdzinho',
                  name: 'mkdzinho',
                  widget: 'markdown',
                },
              })}
            ></ListControl>
            {/* <ObjectWidgetTopBar
              allowAdd={true}
              // onAdd={handleAdd}
              types={field.get(TYPES_KEY, null)}
              // onAddType={type =>
              //   handleAddType(type, resolveFieldKeyType(field))
              // }
              heading={`${items.size} ${listLabel}`}
              label={labelSingular.toLowerCase()}
              onCollapseToggle={this.handleCollapseAllToggle}
              collapsed={itemsCollapsed.every(val => val === true)}
            /> */}
          </div>
        )
      }
    },
    Preview: null,
  }
}
