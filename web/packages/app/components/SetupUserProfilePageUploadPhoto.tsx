import React from 'react'
import { useDropzone } from 'react-dropzone'
import { Box, Typography, CircularProgress } from '@material-ui/core'
import classNames from 'classnames'

import { staticFileUrl } from '@web-technologies/shared/helpers/utils'

/**
 * Types
 */
interface Props {
  loading: boolean
  avatarUrl?: string | null
  onDrop: (files: File[]) => Promise<void>
}

/**
 * CONST
 */
export const ACCEPTED_FILE_EXTENSIONS = 'image/jpeg, image/png'

const SetupUserProfilePageUploadPhoto: React.FC<Props> = ({
  avatarUrl,
  loading,
  onDrop,
}: Props) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILE_EXTENSIONS,
  })

  const avatarSrc = staticFileUrl(avatarUrl)

  const renderers = {
    content: () => {
      if (loading) {
        return <CircularProgress />
      }
      if (avatarSrc) {
        return <img src={avatarSrc} />
      }
      return (
        <>
          <Typography variant="h6" align="center">
            Add photo
          </Typography>
        </>
      )
    },
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      data-test-id="upload-photo"
      {...getRootProps()}
    >
      {renderers.content()}
      <input {...getInputProps()} />
    </Box>
  )
}

export default SetupUserProfilePageUploadPhoto
