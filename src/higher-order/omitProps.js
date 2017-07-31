// @flow
import omit from 'lodash/fp/omit'
import { mapProps, compose } from 'recompose'

export default compose(mapProps, omit)
