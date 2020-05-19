import React, { FunctionComponent, useState } from 'react'
import PropTypes from 'prop-types'
import { createUseStyles, useTheme } from 'react-jss'
import clsx from 'clsx'

import { CustomTheme } from '../../../interface/common'
import { CompanyEmpty } from '../../Icons'

const useStyles = createUseStyles((theme: CustomTheme) => ({
  containerItem: {
    padding: '20px 0',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    borderBottom: `solid 1px ${theme.gray5}`,
    '@media screen and (min-width: 768px)': {
      flexDirection: 'row',
    }
  },
  left: {
    display: 'flex',
    '@media screen and (min-width: 768px)': {
      alignItems: 'center',
      flex: '50% 0 0'
    }
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    '@media screen and (min-width: 768px)': {
      flexDirection: 'row',
      flex: '50% 0 0',
      justifyContent: 'space-between',
      alignItems:  'center'
    }
  },
  wrapperLogo: {
    flex: '60px 0 0',
    height: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapperLogoBg: {
    backgroundColor: theme.gray
  },
  logo: {
    width: '100%',
    heigth: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    borderRadius: '4px'
  },
  wrapperDetail: {
    marginLeft: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: '18px',
    color: theme.black
  },
  company: {
    color: theme.gray2
  },
  wrapperTags: {
    display: 'flex',
    margin: '10px 0',
    '@media screen and (min-width: 768px)': {
      margin: '0 20px',
    }
  }, 
  boxTag: {
    padding: '5px 10px',
    borderRadius: '4px',
    border: `solid 1px ${theme.gray2}`,
    marginRight: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:nth-last-child': {
      marginRight: 0
    }
  },
  tag: {
    fontSize: '14px',
    color: theme.gray2,
    textAlign: 'center'
    // '@media screen and (min-width: 768px)': {
    // }
  },
  wrapperLocation: {
    maxWidth: '120px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  typeContract: {
    fontWeight: '400'
  },
  location: {
    color: theme.gray2
  }
}))

interface Props {
  title: string
  slug: string
  company: string
  city?: string
  tags: Array<string>
  typeContract?: string
  logoUrl?: string
}

const ItemJob: FunctionComponent<Props> = ({ title, city,company, tags, logoUrl, typeContract }: Props) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const [imgError, setImgError] = useState<boolean>(false)
  return (
    <div className={classes.containerItem}>
      <div className={classes.left}>
        <div className={clsx([classes.wrapperLogo], { [classes.wrapperLogoBg]: !logoUrl })}>
          {logoUrl && !imgError ? (
            <img src={logoUrl} onError={() => setImgError(true)} alt={title} className={classes.logo} />
          ) : (<CompanyEmpty />)}
        </div>
        <div className={classes.wrapperDetail}>
        <p className={classes.title}>{title}</p>
        <p className={classes.company}>{company}</p>
      </div>
      </div>
      <div className={classes.right}>
        <div className={classes.wrapperTags}>
          {tags.map((tag) => {
            return (
              <div key={tag} className={classes.boxTag}>
                <p className={classes.tag}>{tag}</p>
              </div>
            )
          })}
        </div>
        <div className={classes.wrapperLocation}>
          <p className={classes.typeContract}>{typeContract}</p>
          <p className={classes.location}>{city}</p>
        </div>
      </div>
    </div>
  )
}

ItemJob.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  city: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  typeContract: PropTypes.string,
  logoUrl: PropTypes.string,
}



export default ItemJob