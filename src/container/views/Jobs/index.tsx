import React, { useState, useEffect } from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import { useQuery } from '@apollo/react-hooks'

import { CustomTheme} from '../../../interface/common'
import SearchJobs from '../../../components/Jobs/SearchJobs'
import ItemJob from '../../../components/Jobs/ItemJob'
import FilterBox from '../../../components/Jobs/FilterBox'
import { GET_JOBS, GET_COUNTRIES, GET_COMPANIES } from '../../../schemas/Job'

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
    '@media screen and (min-width: 1024px)': {
      display: 'flex',
      flexDirection: 'column',
      flex: '200px 0 0',
      marginRight: '50px'
    },
    '@media screen and (min-width: 1200px)': {
      flex: '250px 0 0',
    }
  },
  wrapperList: {
    flex: '1'
  }
}))

type Commitment = {
  title: string
  slug: string
}

export interface BasicInfo {
  id: string
  name: string
  slug: string
}

interface Country extends BasicInfo{}

interface City extends BasicInfo {
  country: Country
}

type Remote = {
  name: string
  type: string
}

interface Company {
  name: string
  logoUrl?: string
}

interface Jobs {
  id: string
  title: string
  slug: string
  commitment: Commitment
  cities: Array<City>
  remotes: Array<Remote> | null
  company: Company
  isPublished: boolean
  isFeatured: boolean
  locationNames: string
  userEmail: string
  postedAt: string
  tags: Array<BasicInfo>
}

const Jobs = (): JSX.Element => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const [itemsJob, setItemsJob ] = useState<Array<Jobs>>([])
  const [listCountries, setListCountries] = useState<Array<BasicInfo>>([])
  const [listCompanies, setListCompanies] = useState<Array<BasicInfo>>([])


  const { loading: loadingJobs, data: { jobs = [] } = {} } = useQuery(GET_JOBS)
  const { loading: loadingCountry, data: { countries = [] } = {} } = useQuery(GET_COUNTRIES)
  const { loading: loadingCompany, data: { companies = [] } = {} } = useQuery(GET_COMPANIES)
  
  console.log("===> Edward <===: jobs", jobs)
  useEffect(() => {
    if (!loadingJobs && jobs.length && !itemsJob.length){

      setItemsJob(jobs)
    }
  }, [itemsJob.length, jobs, loadingJobs])

  useEffect(() => {
    if (!loadingCountry && countries.length && !listCountries.length)
      setListCountries(countries)
  }, [countries, listCountries.length, loadingCountry])

  useEffect(() => {
    if (!loadingCompany && companies.length && !listCompanies.length)
      setListCompanies(companies)
  }, [companies, listCompanies.length, loadingCompany])

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
            listItems={listCountries} 
            onHandleFilter={_handleFilter} 
          />
          <FilterBox
            title='Country'
            listItems={listCompanies}
            onHandleFilter={_handleFilter}
          />
        </div>
        <div className={classes.wrapperList}>
          {itemsJob.length ? itemsJob.map(({ id, title, slug, cities, company, tags, commitment }) => {
            const city = cities.map(({ name }) => name)[0] || ''
            return (
              <ItemJob 
                key={id}
                title={title}
                slug={slug}
                city={city}
                company={company.name}
                tags={tags.map(({ name }) => name)}
                logoUrl={company.logoUrl}
                typeContract={commitment.title}
              />
            )
          }): null}
        </div>
      </div>
    </div>
  )
}

export default Jobs