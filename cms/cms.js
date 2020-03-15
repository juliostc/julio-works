import React from 'react'

import '../src/globalStyles.css'
import data from '../src/data.json'
// import Home from '../src/views/Home'
// import About from '../src/views/About'
// import Contact from '../src/views/Contact'
// import Blog from '../src/views/Blog'
// import SinglePost from '../src/views/SinglePost'
import ProjectView from '../src/views/Project'

import * as ColorWidget from 'netlify-cms-widget-color'
// import ColumnWidgetMaker from './ColumnWidget'

import { BrowserRouter as Router } from 'react-router-dom'

console.log('React version', React.version)

const CMS = window.CMS
CMS.registerPreviewStyle(
  'https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.css'
)
CMS.registerPreviewStyle('/admin/cms.bundle.css')

const getDocument = (collection, name) =>
  data[collection] && data[collection].filter(page => page.name === name)[0]
const getDocuments = (collection, name) => data[collection]

const globalSettings = getDocument('settings', 'global')
const posts = getDocuments('posts')

// Preview Templates
// CMS.registerPreviewTemplate('home-page', ({ entry }) => (
//   <Home fields={entry.toJS().data} />
// ))
// CMS.registerPreviewTemplate('about-page', ({ entry }) => (
//   <About fields={entry.toJS().data} />
// ))
// CMS.registerPreviewTemplate('contact-page', ({ entry }) => (
//   <Contact fields={entry.toJS().data} siteTitle={globalSettings.siteTitle} />
// ))
// CMS.registerPreviewTemplate('blog-page', ({ entry }) => (
//   <Router>
//     <Blog fields={entry.toJS().data} posts={posts} />
//   </Router>
// ))
// CMS.registerPreviewTemplate('posts', ({ entry }) => (
//   <Router>
//     <SinglePost fields={entry.toJS().data} />
//   </Router>
// ))

// CMS.registerPreviewTemplate('projects', ({ entry }) => (
//   <Router>
//     <ProjectView project={entry.toJS().data} />
//   </Router>
// ))

//Additional Widgets!
CMS.registerWidget('color', ColorWidget.Control)

// const ColumnWidget = ColumnWidgetMaker(CMS)
// CMS.registerWidget('column', ColumnWidget.Control, ColumnWidget.Preview)

// CMS.registerWidget('label', props => {
//   const { forID, classNameWrapper, field } = props
//   return (
//     <div id={forID} className={classNameWrapper}>
//       {field.label}
//     </div>
//   )
// })

// CMS.registerEditorComponent({
//   // Internal id of the component
//   id: 'containerRow',
//   // Visible label
//   label: 'Row {',
//   // Fields the user need to fill out when adding an instance of the component

//   fields: [{ name: 'label', label: 'Label', widget: 'hidden' }],
//   // Pattern to identify a block as being an instance of this component
//   pattern: /^::: row\s*([\S]+)?\s*$/,
//   // Function to extract data elements from the regexp match
//   fromBlock: function(match) {
//     return {
//       content: match[1],
//     }
//   },
//   // Function to create a text block from an instance of this component
//   toBlock: function(obj) {
//     return '::: row' // + (obj.classes || '')
//   },
//   // Preview output for this component. Can either be a string or a React component
//   // (component gives better render performance)
//   toPreview: function(obj) {
//     return 'ROW START {'
//   },
// })

// CMS.registerEditorComponent({
//   // Internal id of the component
//   id: 'containerColumn',
//   // Visible label
//   label: 'Column {',
//   // Fields the user need to fill out when adding an instance of the component
//   // fields: [{ name: 'classes', label: 'Classes', widget: 'string' }],
//   fields: null,
//   // Pattern to identify a block as being an instance of this component
//   pattern: /^::: column\s*([\S]+)?\s*$/,
//   // Function to extract data elements from the regexp match
//   fromBlock: function(match) {
//     return {
//       content: match[1],
//     }
//   },
//   // Function to create a text block from an instance of this component
//   toBlock: function(obj) {
//     return '::: column' // + (obj.classes || '')
//   },
//   // Preview output for this component. Can either be a string or a React component
//   // (component gives better render performance)
//   toPreview: function(obj) {
//     return 'COLUMN START {'
//   },
// })

// CMS.registerEditorComponent({
//   // Internal id of the component
//   id: 'containerEnd',
//   // Visible label
//   label: '}',
//   // Fields the user need to fill out when adding an instance of the component
//   // fields: [{ name: 'classes', label: 'Classes', widget: 'string' }],
//   // Pattern to identify a block as being an instance of this component
//   pattern: /^:::\s*$/,
//   // Function to extract data elements from the regexp match
//   // fromBlock: function(match) {
//   //   return {
//   //     content: match[1],
//   //   }
//   // },
//   // Function to create a text block from an instance of this component
//   toBlock: function(obj) {
//     return ':::'
//   },
//   // Preview output for this component. Can either be a string or a React component
//   // (component gives better render performance)
//   toPreview: function(obj) {
//     return '} END'
//   },
// })

// console.log(CMS.getWidgets())

// Return to home when user logging out
window.netlifyIdentity.on('logout', function() {
  document.location.href = '/'
})

// Log netlifySiteURL if editing on localhost
if (
  window.location.hostname === 'localhost' &&
  window.localStorage.getItem('netlifySiteURL')
) {
  console.log(
    `%cnetlifySiteURL: ${window.localStorage.getItem('netlifySiteURL')}`,
    'color: hotpink; font-size: 15px'
  )
}
