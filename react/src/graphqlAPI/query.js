export const GET_USER = `
  query {
    user { 
      id
      email
      is_verified
      created_on
    }
  }
`

export const GET_ALL_JOB_POSTS = `
  query ($user_id: Int!) {
    user_by_pk(id: $user_id) {
      tags
    }
    job_post(order_by: {updated_at: desc}) {
      user_id
      id
      title
      company
      description
      location
      url
      tags
      status
      resumes {
        filename
        url
      }
      created_at
      updated_at
    }
  }
`

export const GET_JOB_POST_BY_ID = `
  query ($job_id: Int!, $user_id: Int!) {
    user_by_pk(id: $user_id) {
      tags
    }
    job_post_by_pk(id: $job_id) {
      user_id
      id
      title
      company
      description
      location
      url
      tags
      status
      resumes {
        id
        url
        filename
        s3_key
      }
      gists {
        id
        url
        description
      }
      emails {
        id
        url
        description
      }
      timelines {
        id
        property
        value
        time
      }
      created_at
      updated_at
    }
  }
`

export const GET_TAGS = `
  query ($user_id: Int!, $job_id: Int!) {
    user_by_pk(id: $user_id) {
      tags
    }
    job_post_by_pk(id: $job_id) {
      tags
    }
  }
`

export const GET_USER_TAGS = `
  query ($id: Int!) {
    user_by_pk(id: $id) {
      tags
    }
  }
`
