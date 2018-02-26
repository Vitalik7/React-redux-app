import { connect } from 'react-redux'
import SecondComponent from './secondComponent'

const mapStateToProps = (state, ownProps) => {
    return {
        testUser: state.main.user
    }
}

export default connect(
    mapStateToProps)(SecondComponent)
