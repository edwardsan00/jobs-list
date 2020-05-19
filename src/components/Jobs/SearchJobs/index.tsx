import React, { FunctionComponent, useState } from 'react'
import PropTypes from 'prop-types'
import { createUseStyles, useTheme } from 'react-jss'

import { CustomTheme } from '../../../interface/common'
import { Search } from '../../Icons'

const useStyles = createUseStyles((theme: CustomTheme) => ({
  containerSearch: {
    width: '100%',
    maxWidth: '700px',
    margin: '0 auto',
    display: 'flex',
    padding: '50px 0'
  },
  searchLeft: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 5px 5px 15px',
    border: `solid 1px ${theme.black}`,
    height: '50px',
    width: '100%',
    borderRadius: '4px'
  },
  inputSearch: {
    flex: '1',
    margin: '0 5px 0 10px',
    height: '100%',
    fontSize: '18px',
    lineHeight: '24px',
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent'
  },
  btnSearch: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.black,
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    padding: '0 5px',
    '@media screen and (min-width: 768px)': {
      padding: '0 20px',
      fontSize: '18px',
    }
  }
}))

type FromElement = React.FormEvent<HTMLInputElement>
type Props = {
  onHandleSearch: (search: string) => void
}

const SearchJobs: FunctionComponent<Props>  = ({ onHandleSearch }: Props): JSX.Element => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const [search, setSearch] = useState<string>('')

  const _handleSearch = (e: FromElement) => {
    const { value } = e.currentTarget
    setSearch(value)
  }

  const _handleSubmitSearch = () => {
    if(search !== '')
      onHandleSearch(search)
  }

  return (
    <div className={classes.containerSearch}>
      <div className={classes.searchLeft}>
        <Search />
        <input placeholder='Job title or keyword' onChange={_handleSearch} value={search} className={classes.inputSearch} />
        <button onClick={_handleSubmitSearch} className={classes.btnSearch}>Search</button>
      </div>
    </div>
  )
}

SearchJobs.propTypes = {
  onHandleSearch: PropTypes.func.isRequired
}

export default SearchJobs