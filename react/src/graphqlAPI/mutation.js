export const UPDATE_JOB_POST = `
  mutation ($id: Int!, $input: job_post_set_input) {
    update_job_post_by_pk(pk_columns: {id: $id}, _set: $input) {
      company
      created_at
      description
      id
      status
      title
      updated_at
    }
  }
`

export const CREATE_JOB_POST = `
  mutation ($object: job_post_insert_input!) {
    insert_job_post_one(object: $object) {
      id
    }
  }
`

export const DELETE_JOB_POST = `
  mutation ($id:Int!) {
    delete_job_post_by_pk(id: $id) {
      id
      description
    }
  }
`

export const CREATE_JOB_TAG = `
mutation ($job_id: Int!, $tag: jsonb, $time: timestamptz!) {
  update_job_post_by_pk(
    pk_columns: {id: $job_id},
    _append: {tags: $tag},
    _set: {updated_at: $time}
  ) {
    id
    title
    tags
    created_at
    updated_at
  }
}
`
//create tag for both job and user
export const CREATE_TAG = `
  mutation ($tag: jsonb, $tags: _text, $user_id: Int!, $job_id: Int!, $time: timestamptz!) {
    update_job_post_by_pk(
      pk_columns: {id: $job_id},
      _append: {tags: $tag},
      _set: {updated_at: $time}
    ) {
      id
      title
      tags
      created_at
      updated_at
    }
    update_user_by_pk(
      pk_columns: {id: $user_id},
      _set: {tags: $tags}
    ) {
      id
      email
      tags
    }
  }
`

export const CREATE_USER_TAG = `
  mutation ($tags: _text, $user_id: Int!) {
    update_user_by_pk(
      pk_columns: {id: $user_id},
      _set: {tags: $tags}
    ) {
      id
      email
      tags
    }
  }
`

export const UPDATE_USER_TAG = `
  mutation ($user_id: Int!, $tags: _text, $search: jsonb, $replace: jsonb, $delete: String) {
    updateUserTags: update_user_by_pk(
      pk_columns: {id:  $user_id}
      _set: {tags: $tags},
    ) {
      id
      tags
    }
    appendJobTag: update_job_post (
      where: {
        tags: {
          _contains: $search
        }
      },
      _append: {tags: $replace},
    ) {
      affected_rows
    }
    deleteJobTag: update_job_post(
      where: {
        tags: {
          _contains: $search
        }
      },
      _delete_key: {tags: $delete}
    ) { 
      affected_rows
      returning {
        id
        title
        tags
      }
    }
  }
`

export const DELETE_USER_TAG = `
  mutation ($user_id: Int!, $tags: _text, $search: jsonb, $delete: String) {
    updateUserTags: update_user_by_pk(
      pk_columns: {id:  $user_id}
      _set: {tags: $tags},
    ) {
      id
      tags
    }
    update_job_post(
      where: {
        tags: {_contains: $search}
      },
      _delete_key: {
        tags: $delete}
    ) { 
      affected_rows
    }
  }
`

export const DELETE_JOB_TAG = `
  mutation ($job_id: Int!, $tag: String) {
    update_job_post_by_pk(
      pk_columns: {id: $job_id}, 
      _delete_key: {tags: $tag}
    ) {
      id
      title
      company
      tags
    }
  }
`

export const UPDATE_JOB_STATUS = `
  mutation ($id: Int!, $status: pipeline_status_enum, $time: timestamptz!, $object: timeline_insert_input!) {
    update_job_post_by_pk(pk_columns: {id: $id}, _set: {status: $status, updated_at: $time}) {
      id
      title
      company
      status
      tags
      updated_at
    }  
    insert_timeline_one(object: $object) {
      id
      job_id
      property
      value
    }
  }
`

export const CREATE_RESUME = `
mutation ($object: resume_insert_input!) {
  insert_resume_one(object: $object) {
    id
    user_id
    job_id
    url
    s3_key
    filename
  }
}
`

export const UPDATE_RESUME = `
mutation ($id: Int!, $input: String) {
  update_resume_by_pk(pk_columns: {id: $id}, _set: {filename: $input}) {
    id
    filename
  }
}
`

export const DELETE_RESUME = `
mutation ($id: Int!) {
  delete_resume_by_pk(id: $id) {
    id
    filename
  }
}
`
export const CREATE_GIST = `
mutation ($object: gist_insert_input!, $job_id: Int!, $updated_at: timestamptz! ) {
  insert_gist_one(object: $object) {
    id
    url
    description
  }
  update_job_post_by_pk(pk_columns: {id: $job_id}, _set: {updated_at: $updated_at}) {
    id
    title
    updated_at
  }  
}
`

export const UPDATE_GIST = `
mutation ($id: Int!, $description: String, $job_id: Int!, $updated_at: timestamptz!) {
  update_gist_by_pk(pk_columns: {id: $id}, _set: {description: $description}) {
    id
    description
    url
  }
  update_job_post_by_pk(pk_columns: {id: $job_id}, _set: {updated_at: $updated_at}) {
    id
    title
    updated_at
  }  
}
`

export const DELETE_GIST = `
mutation ($id: Int!, $job_id: Int!, $updated_at: timestamptz!) {
  delete_gist_by_pk(id: $id) {
    id
  }
  update_job_post_by_pk(pk_columns: {id: $job_id}, _set: {updated_at: $updated_at}) {
    id
    title
    updated_at
  }  
}
`

export const CREATE_EMAIL = `
mutation ($object: email_insert_input!, $job_id: Int!, $updated_at: timestamptz! ) {
  insert_email_one(object: $object) {
    id
    url
    description
  }
  update_job_post_by_pk(pk_columns: {id: $job_id}, _set: {updated_at: $updated_at}) {
    id
    title
    updated_at
  }  
}
`

export const UPDATE_EMAIL = `
mutation ($id: Int!, $description: String, $job_id: Int!, $updated_at: timestamptz!) {
  update_email_by_pk(pk_columns: {id: $id}, _set: {description: $description}) {
    id
    description
    url
  }
  update_job_post_by_pk(pk_columns: {id: $job_id}, _set: {updated_at: $updated_at}) {
    id
    title
    updated_at
  }  
}
`

export const DELETE_EMAIL = `
mutation ($id: Int!, $job_id: Int!, $updated_at: timestamptz!) {
  delete_email_by_pk(id: $id) {
    id
  }
  update_job_post_by_pk(pk_columns: {id: $job_id}, _set: {updated_at: $updated_at}) {
    id
    title
    updated_at
  }  
}
`

export const INSERT_TIMELINE = `
mutation ($object: timeline_insert_input!) {
  insert_timeline_one(object: $object) {
    id
    job_id
    property
    value
  }
}
`
