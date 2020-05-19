import React from 'react'
import { createUseStyles, useTheme } from 'react-jss'

import { CustomTheme} from '../../../interface/common'
import SearchJobs from '../../../components/Jobs/SearchJobs'
import ItemJob from '../../../components/Jobs/ItemJob'
import FilterBox from '../../../components/Jobs/FilterBox'

const useStyles = createUseStyles((theme: CustomTheme) => ({
  containerJobs: {

  },
  wrapperResult: {
    width: '100%',
    display: 'flex',
    '@media screen and (min-width: 768px)': {
      flex: 1
    }
  },
  wrapperFilters: {
    display: 'none',
    '@media screen and (min-width: 768px)': {
      display: 'flex',
      flexDirection: 'column',
      flex: '250px 0 0',
      marginRight: '50px'
    }
  },
  wrapperList: {
    flex: '1'
  }
}))

const Jobs = (): JSX.Element => {
  const theme = useTheme()
  const classes = useStyles(theme)

  const _handleSearch = (search: string) => {
    console.log(search)
  }

  const _handleFilter = (filter: string, slug: string) => {
    console.log(filter, slug)
  }

  return (
    <div className={classes.containerJobs}>
      <SearchJobs onHandleSearch={_handleSearch} />
      <div className={classes.wrapperResult}>
        <div className={classes.wrapperFilters}>
          <FilterBox
            title='Jobs' 
            listItems={[{
              name: 'Test',
              slug: 'Test'
            }]} 
            onHandleFilter={_handleFilter} 
          />
          <FilterBox
            title='Country'
            listItems={[{
              name: 'Panama',
              slug: 'panama'
            }]}
            onHandleFilter={_handleFilter}
          />
        </div>
        <div className={classes.wrapperList}>
          {[1,2,3].map(() => {
            return (
              <ItemJob 
                title='Senior Fullstack Engineer - Platform'
                city='San Francisco'
                company='Spotify'
                tags={['Full Stack', 'React', 'Node']}
                logoUrl='https://logo.clearbit.com/segment.com?size=200'
                typeContract='Fulltime'
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Jobs