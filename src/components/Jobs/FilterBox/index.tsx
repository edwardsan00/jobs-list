import React, { FunctionComponent } from 'react' 
import PropTypes from 'prop-types'
import { createUseStyles, useTheme } from 'react-jss'

import { CustomTheme } from '../../../interface/common'
import { BasicInfo } from '../../../container/views/Jobs'

interface Props {
  title: string
  listItems: Array<BasicInfo>
  onHandleFilter: (filter:string, slug: string) => void
}

const useStyles = createUseStyles((theme: CustomTheme) => ({
  containerFilter: {
    width: '100%',
    marginBottom: '25px'
  },
  title: {
    fontWeight: 'bold'
  },
  containerCheckbox: {

  },
  containerList: {
    marginTop: '10px'
  },
  checkContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    '& input': {
      padding: 0,
      height: 'initial',
      width: 'initial',
      marginBottom: 0,
      display: 'none',
      cursor: 'pointer',
      '&:checked + label:after':{
        content: '""',
        display: 'block',
        position: 'absolute',
        top: '2px',
        left: '6px',
        width: '6px',
        height: '10px',
        border: `solid ${theme.black}`,
        borderWidth: '0 2px 2px 0',
        transform: 'rotate(45deg)'
      }
    },
    '& label': {
      position: 'relative',
      cursor: 'pointer',
      display: 'flex',
      fontSize: '16px',
      alignItems: 'flex-end',
      color: theme.gray2,
      '&:before':{
        content: '""',
        '-webkit-appearance': 'none',
        backgroundColor: 'transparent',
        border: `2px solid ${theme.black}`,
        borderRadius: '4px',
        display: 'flex',
        position: 'relative',
        cursor: 'pointer',
        width: '15px',
        height: '15px',
        marginRight: '5px'
      }
    }
  }
}))

const FilterBox: FunctionComponent<Props> = ({ title, listItems, onHandleFilter }: Props) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  const _handleFilter = (slug: string) => {
    onHandleFilter(title, slug)
  }

  return (
    <div className={classes.containerFilter}>
      <h4 className={classes.title}>{title}</h4>
      <div className={classes.containerList}>
        {listItems.map(({ name, slug, id }) => {
          return (
            <div key={id} className={classes.checkContainer}>
              <input type="checkbox" id={slug} />
              <label onClick={() => _handleFilter(slug)} htmlFor={slug}>{name}</label>
            </div>
          )
        })}
      </div>
    </div>
  )
}

FilterBox.propTypes = {
  title: PropTypes.string.isRequired,
  listItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onHandleFilter: PropTypes.func.isRequired
}

export default FilterBox