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
  },
  loading: {
    padding: '20px 0'
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
  slug: string
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

interface Filter {
  country: Array<string>
  company: Array<string>
}

export type FilterType = keyof Filter

const Jobs = (): JSX.Element => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const [itemsJob, setItemsJob] = useState<Array<Jobs>>([])
  const [listCountries, setListCountries] = useState<Array<BasicInfo>>([])
  const [listCompanies, setListCompanies] = useState<Array<BasicInfo>>([])
  const [filters, setFilters] = useState<Filter>({ country: [], company: []})
  const [search, setSearch] = useState<string>('')

  const { loading: loadingJobs, data: { jobs = [] } = {} } = useQuery(GET_JOBS)
  const { loading: loadingCountry, data: { countries = [] } = {} } = useQuery(GET_COUNTRIES)
  const { loading: loadingCompany, data: { companies = [] } = {} } = useQuery(GET_COMPANIES)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const applyFiltersAndSearch = () => {
    const jobsList: Array<Jobs> = jobs
    const filterBySearch = (search === '') ? jobs : jobsList.filter(({ title }) => title.toLowerCase().includes(search))
    const filterByCompany = filters.company.length ? filterBySearch.filter(({ company }) => filters.company.includes(company.slug)) : filterBySearch
    const filterByCountry = filters.country.length ? 
    filterByCompany.filter(({ cities }) => {
      const [country] = cities.length ? cities.map(({ country }) => country.slug): ['']
      return filters.country.includes(country)
    })
    : filterByCompany

    setItemsJob(filterByCountry)
  }
  
  useEffect(() => {
    if (!loadingJobs && jobs.length && !itemsJob.length && (!search && !filters.company.length && !filters.country.length))
      setItemsJob(jobs)
  }, [filters.company.length, filters.country.length, itemsJob.length, jobs, loadingJobs, search])

  useEffect(() => {
    if (!loadingCountry && countries.length && !listCountries.length)
      setListCountries(countries)
  }, [countries, listCountries.length, loadingCountry])

  useEffect(() => {
    if (!loadingCompany && companies.length && !listCompanies.length)
      setListCompanies(companies)
  }, [companies, listCompanies.length, loadingCompany])

  useEffect(() => {
    applyFiltersAndSearch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filters])

  const _handleSearch = (search: string) => {
    setSearch(search)
  }

  const _handleFilter = (filter: FilterType, slug: string) => {
    const oldData = filters[filter]
    setFilters((prevState) => ({
      ...prevState,
      [filter]: oldData.includes(slug) ? oldData.filter((item) => item !== slug) : [...oldData, slug]
    }))
  }

  return (
    <>
    <div className={classes.containerJobs}>
      <SearchJobs onHandleSearch={_handleSearch} />
      <div className={classes.wrapperResult}>
        <div className={classes.wrapperFilters}>
          <FilterBox
            title='country' 
            listItems={listCountries} 
            onHandleFilter={_handleFilter} 
          />
          <FilterBox
            title='company'
            listItems={listCompanies}
            onHandleFilter={_handleFilter}
          />
        </div>
        <div className={classes.wrapperList}>
          {loadingJobs ? (
            <p className={classes.loading}>Loading...</p>
          ) : (
            <>
              {itemsJob.length ? itemsJob.map(({ id, title, slug, cities, company, tags, commitment }) => {
                const city = cities.map(({ name }) => name)[0] || ''
                const tagsName = tags.map(({ name }) => name)
                return (
                  <ItemJob
                    key={id}
                    title={title}
                    slug={slug}
                    city={city}
                    company={company.name}
                    tags={tagsName}
                    logoUrl={company.logoUrl}
                    typeContract={commitment.title}
                  />
                )
              }) : (<p>Jobs not found</p>)}
            </>
          )}
        </div>
      </div>
    </div>
    </>
  )
}

export default Jobs