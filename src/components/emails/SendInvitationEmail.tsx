import { BRAND } from '@/constants'
import { Env } from '@/utils/env'
import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Tailwind,
    Text,
} from '@react-email/components'

interface InviteUserEmailProps {
    invitedUsername: string
    invitedByUsername: string
    invitedByEmail: string
    projectName: string
    inviteLink: string
}

const baseUrl = Env.NEXT_PUBLIC_VERCEL_URL ? Env.NEXT_PUBLIC_VERCEL_URL : ''

export default function SendInvitationEmailTemplate(
    props: InviteUserEmailProps
) {
    const {
        invitedUsername,
        invitedByUsername,
        invitedByEmail,
        projectName,
        inviteLink,
    } = props
    const previewText = `Join ${invitedByUsername} on ${BRAND.name}`

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Body className='bg-white my-auto mx-auto font-sans px-2'>
                    <Container className='border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]'>
                        <Section className='mt-[32px]'>
                            <Img
                                src={`${baseUrl}/static/assets/images/logo.png`}
                                width='40'
                                height='37'
                                alt='logo.png'
                                className='my-0 mx-auto'
                            />
                        </Section>
                        <Heading className='text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0'>
                            Join <strong>{projectName}</strong> on{' '}
                            <strong>{BRAND.name}</strong>
                        </Heading>

                        <Text className='text-black text-[14px] leading-[24px]'>
                            <strong className='capitalize'>
                                {invitedByUsername}
                            </strong>{' '}
                            (
                            <Link
                                href={`mailto:${invitedByEmail}`}
                                className='text-blue-600 no-underline'
                            >
                                {invitedByEmail}
                            </Link>
                            ) has invited you to the{' '}
                            <strong>{projectName}</strong> team on{' '}
                            <strong>{BRAND.name}</strong>.
                        </Text>

                        <Section className='text-center mt-[32px] mb-[32px]'>
                            <Button
                                className='bg-[#22c55e] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3'
                                href={inviteLink}
                            >
                                Join the team
                            </Button>
                        </Section>
                        <Text className='text-black text-[14px] leading-[24px]'>
                            or copy and paste this URL into your browser:{' '}
                            <Link
                                href={inviteLink}
                                className='text-blue-600 no-underline'
                            >
                                {inviteLink}
                            </Link>
                        </Text>
                        <Hr className='border border-solid border-[#eaeaea] my-[26px] mx-0 w-full' />
                        <Text className='text-[#666666] text-[12px] leading-[24px]'>
                            This invitation was intended for{' '}
                            <span className='text-black'>
                                {invitedUsername}
                            </span>
                            . If you were not expecting this invitation, you can
                            ignore this email. If you are concerned about your
                            account's safety, please reply to this email to get
                            in touch with us.
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}
