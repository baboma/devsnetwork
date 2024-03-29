import * as React from 'react'
import { Link } from 'react-router-dom'

interface PROFILEGITHUB {
  username: string
}

interface REPO {
  id: string
  html_url: string
  name: string
  description: string
  stargazers_count: number
  watchers_count: number
  forks_count: number
}

export const ProfileGithub: React.FC<PROFILEGITHUB> = (props: PROFILEGITHUB): React.ReactElement => {
  const myRef = React.createRef<HTMLDivElement>()
  const count = 5
  const sort = 'created: asc'
  const { username } = props
  const uri = `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}`
  const [repos, setRepos] = React.useState([])

  React.useEffect(() => {
    fetch(uri)
      .then(res => res.json())
      .then(data => {
        if (myRef.current) {
          setRepos(data)
        }
      })
      .catch(err => console.log(err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const repoItems = repos.map((repo: REPO) => (
    <div key={repo.id} className='card card-body mb-2'>
      <div className='row'>
        <div className='col-md-6'>
          <h4>
            <Link to={repo.html_url} className='text-info' target='_blank'>
              {repo.name}
            </Link>
          </h4>
          <p>{repo.description}</p>
        </div>
        <div className='col-md-6'>
          <span className='badge badge-info mr-1'>
            Stars: {repo.stargazers_count}
          </span>
          <span className='badge badge-secondary mr-1'>
            Watchers: {repo.watchers_count}
          </span>
          <span className='badge badge-success'>
            Forks: {repo.forks_count}
          </span>
        </div>
      </div>
    </div>
  ))
  return (
    <div ref={myRef}>
      <hr />
      <h3 className='mb-4'>Latest Github Repos</h3>
      {repoItems}
    </div>
  )
}