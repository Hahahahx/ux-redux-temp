import React  from 'react'


const NoMatch = () => {

    console.log('no-match')

    return <div className='page'>NoMatch-404</div>
}



export default React.memo(NoMatch, () => true);