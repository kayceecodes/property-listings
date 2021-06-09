import React from 'react'
import GridContainer from '../ui/grid/GridContainer'
import Link from 'next/link'
import Button from '@material-ui/core/Button/Button'

export default function Header() {
    return (
        <GridContainer alignItems='center' justify='center' xs={2} padding={30}>
            <Link href='/'>
                <Button>
                    Home
                </Button>
            </Link>
            <Link href='/listings'>
                <Button>
                    Listings                    
                </Button>
            </Link>
            <Link href='/auth/sign-up'>
                <Button>
                    Sign Up
                </Button>
            </Link>
            <Link href='/auth/login'>
                <Button>
                    Login
                </Button>
            </Link>
        </GridContainer>
    )
}
