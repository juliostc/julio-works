import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Helmet from 'react-helmet'

import ScrollToTop from './components/ScrollToTop'
import Meta from './components/Meta'
// import ProjectCard from './components/ProjectCard'
// import Home from './old-views/Home'
// import About from './old-views/About'
// import Blog from './old-views/Blog'
// import SinglePost from './old-views/SinglePost'
// import Contact from './old-views/Contact'

// import Nav from './components/Nav'
import Footer from './components/Footer'
// import GithubCorner from './components/GithubCorner'
import ServiceWorkerNotifications from './components/ServiceWorkerNotifications'

//Views
// import HomeView from './views/Home'
import WorksView from './views/Works'
import ProjectView from './views/Project'
import AboutView from './views/About'
import NoMatch from './views/NoMatch'

//Material UI

import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

//my components
import NavBar from './components/Navbar'

import data, { getDocument } from './util/data'
import { slugify } from './util/url'
// import { documentHasTerm, getCollectionTerms } from './util/collection'

let theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: '#EE4343' },
    // secondary: orange,
    background: {
      // default: "#131313",
      default: '#000',
      paper: '#10100f',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
})

theme = responsiveFontSizes(theme)

const RouteWithMeta = ({ component: Component, ...props }) => (
  <Route
    {...props}
    render={(routeProps) => (
      <Fragment>
        <Meta {...props} />
        <Component {...routeProps} {...props} />
      </Fragment>
    )}
  />
)

class App extends Component {
  // state = {
  //   data,
  // }

  render() {
    const globalSettings = getDocument('settings', 'global')
    const {
      siteTitle,
      siteUrl,
      siteDescription,
      socialMediaCard,
      headerScripts,
    } = globalSettings
 
    const aux = getDocument('settings', 'customredirects')
 
    const customRedirects = aux && aux.customRedirects 
 


    //settings -> customRedirects -> customRedirects

    //this should go to the works view
    // const posts = this.getDocuments('posts').filter(
    //   post => post.status !== 'Draft'
    // )
    // console.warn('fix this!!!')

    const { projects } = data
    // const projects = []
    // const categoriesFromPosts = getCollectionTerms(projects, 'categories')
    // const postCategories = getDocuments('postCategories').filter(
    //   category => categoriesFromPosts.indexOf(category.name.toLowerCase()) >= 0
    // )

    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />

          <div
            className="React-Wrap"
            style={{ minHeight: '100vh', position: 'relative' }}
          >
            <ScrollToTop />
            <ServiceWorkerNotifications reloadOnUpdate />

            <Helmet
              defaultTitle={siteTitle}
              titleTemplate={`${siteTitle} | %s`}
            />

            <Meta
              headerScripts={headerScripts}
              absoluteImageUrl={
                socialMediaCard &&
                socialMediaCard.image &&
                siteUrl + socialMediaCard.image
              }
              twitterCreatorAccount={
                socialMediaCard && socialMediaCard.twitterCreatorAccount
              }
              twitterSiteAccount={
                socialMediaCard && socialMediaCard.twitterSiteAccount
              }
            />

            <NavBar />

            <Switch>
            
              

              <RouteWithMeta
                path={['/', '/projects']}
                exact
                component={WorksView}
                description={siteDescription}
                fields={getDocument('pages', 'home')}
                projects={projects}
              />

              <RouteWithMeta
                path="/about"
                exact
                component={AboutView}
                fields={getDocument('pages', 'about')}
              />

              {/*
              <RouteWithMeta
                path="/projects/"
                exact
                component={WorksView}
                fields={getDocument('pages', 'projects')}
                projects={projects}
                //postCategories={postCategories}
              /> */}

              {projects.map((project, index) => {
                // const path = slugify(`/projects/${project.id}`)
                const path = `/projects/${project.id}`

                const nextProject = projects[index - 1]
                const prevProject = projects[index + 1]

                return (
                  <RouteWithMeta
                    key={path}
                    path={path}
                    exact
                    component={ProjectView}
                    project={project}
                    nextprojectURL={
                      nextProject && slugify(`/blog/${nextProject.title}/`)
                    }
                    prevprojectURL={
                      prevProject && slugify(`/blog/${prevProject.title}/`)
                    }
                  />
                )
              })}

              {customRedirects && customRedirects.map((redir, index) => {
                return (<RouteWithMeta
                path={[`/for/${redir.customURL}`]}
                exact
                component={() => { 
                  window.location.href = redir.redirectURL; 
                  return null;
             }}
                description={siteDescription}
              
              />)
              })}

              {/* {postCategories.map(postCategory => {
                const slug = slugify(postCategory.title)
                const path = slugify(`/blog/category/${slug}`)
                const categoryPosts = posts.filter(post =>
                  documentHasTerm(post, 'categories', slug)
                )
                return (
                  <RouteWithMeta
                    key={path}
                    path={path}
                    exact
                    component={Blog}
                    fields={getDocument('pages', 'blog')}
                    posts={categoryPosts}
                    postCategories={postCategories}
                  />
                )
              })} */}

              <Route render={() => <NoMatch siteUrl={siteUrl} />} />
            </Switch>

            <Footer />
          </div>
        </MuiThemeProvider>
      </Router>
    )
  }
}

export default App
