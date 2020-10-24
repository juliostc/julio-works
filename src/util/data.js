import React from 'react'

import data from '../data.json'

import sortzzy from 'sortzzy'

import SvgIcon from '@material-ui/core/SvgIcon'
import FacebookIcon from '@material-ui/icons/Facebook'
import YouTubeIcon from '@material-ui/icons/YouTube'
import LanguageIcon from '@material-ui/icons/Language' //this is the "web" logo
import GitHubIcon from '@material-ui/icons/GitHub'

const sortByMostRecent = (a, b) => {
  if (a.date > b.date) {
    return -1
  }

  if (a.date < b.date) {
    return 1
  }
  // a must be equal to b
  return 0
}

const projects = !data.projects
  ? []
  : data.projects
      .map((proj) => ({
        ...proj,
        date: new Date(
          proj.date.year + ' ' + proj.date.month + ' ' + proj.date.day
        ),
      }))
      .sort(sortByMostRecent)

// console.log('projects')
// console.log(projects)

function isEmptyOrSpaces(str) {
  return str === null || str.match(/^ *$/) !== null
}

export const getAllCategories = () => {
  const types = new Set()
  projects.forEach((proj) => {
    for (const cat of proj.categories) {
      if (cat && !isEmptyOrSpaces(cat)) types.add(cat)
    }
  })
  return Array.from(types).sort()
}

//deprecated
// export const getImageURL = (project, imageName) => {
//   imageName = imageName || 'mainImage'
//   let imgURL = {}
//   try {
//     imgURL = require('../../images/' + project.id + '/' + project[imageName])
//   } catch (e) {
//     // let random = Math.floor(Math.random() * (10 - 1)) + 1;
//     let random = project.title.length - 20
//     imgURL = 'https://picsum.photos/' + (300 + random) + '/' + (300 + random)
//   }
//   return imgURL
// }

//was findById (changed)
export const getProject = (id) => {
  return projects.find((proj) => proj.id === id)
}

export const categoriesToString = (categories, separator) => {
  console.warn('using categories to string, remove that')
  // let first = true;
  // return categories.map(cat => {
  //   if (first) {
  //     first = false;
  //     return cat;
  //   } else {
  //     return separator + cat;
  //   }
  // });
  return categories.join(separator)
}

export const LogoIcon = ({ type }) => {
  switch (type.toLowerCase()) {
    case 'behance':
      return (
        <SvgIcon>
          <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.67.767-.61.165-1.252.254-1.91.254H0V4.51h6.938v-.007zM16.94 16.665c.44.428 1.073.643 1.894.643.59 0 1.1-.148 1.53-.447.424-.29.68-.61.78-.94h2.588c-.403 1.28-1.048 2.2-1.9 2.75-.85.56-1.884.83-3.08.83-.837 0-1.584-.13-2.272-.4-.673-.27-1.24-.65-1.72-1.14-.464-.49-.823-1.08-1.077-1.77-.253-.69-.373-1.45-.373-2.27 0-.803.135-1.54.403-2.23.27-.7.644-1.28 1.12-1.79.495-.51 1.063-.895 1.736-1.194s1.4-.433 2.22-.433c.91 0 1.69.164 2.38.523.67.34 1.22.82 1.66 1.4.44.586.75 1.26.94 2.02.19.75.25 1.54.21 2.38h-7.69c0 .84.28 1.632.71 2.065l-.08.03zm-10.24.05c.317 0 .62-.03.906-.093.29-.06.548-.165.763-.3.21-.135.39-.328.52-.583.13-.24.19-.57.19-.96 0-.75-.22-1.29-.64-1.62-.43-.32-.99-.48-1.69-.48H3.24v4.05H6.7v-.03zm13.607-5.65c-.352-.385-.94-.592-1.657-.592-.468 0-.855.074-1.166.238-.302.15-.55.35-.74.59-.19.24-.317.48-.392.75-.075.26-.12.5-.135.71h4.762c-.07-.75-.33-1.3-.68-1.69v.01zM6.52 10.45c.574 0 1.05-.134 1.425-.412.374-.27.554-.72.554-1.338 0-.344-.07-.625-.18-.846-.13-.22-.3-.39-.5-.512-.21-.124-.45-.21-.72-.257-.27-.053-.56-.074-.84-.074H3.23v3.44h3.29zm9.098-4.958h5.968v1.454h-5.968V5.48v.01z" />
        </SvgIcon>
      )
    case 'youtube':
      return <YouTubeIcon></YouTubeIcon>
    case 'issuu':
      return (
        <SvgIcon>
          <path d="M.996 0A.998.998 0 0 0 0 .996V12c0 6.628 5.372 12 12 12s12-5.372 12-12S18.628 0 12 0H.996zm11.17 3.582a8.333 8.333 0 0 1 8.254 8.41 8.333 8.333 0 0 1-8.41 8.252c-4.597-.045-8.296-3.81-8.254-8.41.045-4.6 3.81-8.296 8.41-8.252zm-.031 2.27a6.107 6.107 0 0 0-6.155 6.046 6.109 6.109 0 0 0 6.05 6.163 6.099 6.099 0 0 0 6.154-6.047 6.107 6.107 0 0 0-6.041-6.162h-.008zm-.02 3.013a3.098 3.098 0 0 1 3.063 3.123 3.088 3.088 0 0 1-3.121 3.06l.002-.001a3.091 3.091 0 0 1 .056-6.182z" />
        </SvgIcon>
      )
    case 'website':
      return <LanguageIcon></LanguageIcon>
    case 'facebook':
      return <FacebookIcon></FacebookIcon>
    case 'github':
      return <GitHubIcon></GitHubIcon>
    default:
      return null
  }
}

const projectArraysToString = (proj) => {
  const transform = (array) =>
    array
      .join(',')
      .replace(new RegExp(' ', 'g'), '_')
      .replace(new RegExp(',', 'g'), ' ')
  return {
    ...proj,
    categoriesToString: !!proj.categories && transform(proj.categories),
    toolsToString: !!proj.tools && transform(proj.tools),
  }
  return proj
}

export const getRelatedProjects = (project) =>
  sortzzy.sort(
    projects.map(projectArraysToString),
    projectArraysToString(project),
    [
      {
        name: 'title',
        type: 'string',
        weight: 2,
        options: { ignoreCase: true },
      },
      {
        name: 'type',
        type: 'string',
        weight: 1,
        options: { ignoreCase: true },
      },
      {
        name: 'categoriesToString',
        type: 'string',
        weight: 2,
        options: { ignoreCase: true },
      },
      {
        name: 'toolsToString',
        type: 'string',
        weight: 2,
        options: { ignoreCase: true },
      },
    ],
    { dataOnly: true, sorted: true }
  )

export const getNextProject = (project) => {
  let nextIndex = projects.findIndex((p) => p.id == project.id) + 1
  if (nextIndex >= projects.length) {
    nextIndex = 0
  }
  return projects[nextIndex]
}

export default { ...data, projects }

export const getDocument = (collection, name) =>
  data[collection] && data[collection].filter((page) => page.name === name)[0]

export const getDocuments = (collection) => data[collection] || []
