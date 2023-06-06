---
id: inclusion_list
title: InclusionList
---

A field allowing a user to select multiple values to include. <br />

![InclusionList - not selected](../../images/SQFormInclusionListExample1.png) ![InclusionList - selected](../../images/SQFormInclusionListExample2.png) <br />

## How to Use

```js
import {
  SQForm,
  SQFormInclusionList,
  SQFormStoryWrapper,
} from '@selectquotelabs/sqform';
return (
  <SQFormStoryWrapper
    initialValues={{
      friends: ['Joe', 'Jane', 'Jack', 'Jill'],
      selectAll: false,
    }}
  >
    <Card
      raised
      style={{
        minWidth: 250,
        padding: 16,
      }}
    >
      <SQFormInclusionList
        name="friends"
        selectAllContainerProps={{
          style: {
            padding: '0 16px',
          },
        }}
        selectAllData={[
          'Jim',
          'Jake',
          'John',
          'Jose',
          'Jaipal',
          'Joe',
          'Jane',
          'Jack',
          'Jill',
        ]}
        selectAllProps={{
          label: 'ALL THE PEEPS',
        }}
        useSelectAll
      />
    </Card>
  </SQFormStoryWrapper>
);
```

## Props

`SQFormInclusionListProps`

| Prop Name | Required | Type | Default | Description |
| --- | --- | --- | --- | --- |
| name | true | string |  | The `name` must match the name of the desired array in `initialValues` |
| children | true | function |  | Children must be a function that accepts one param of type FieldArrayRenderProps and returns a single, or array of, SQFormInclusionListItems |
| useSelectAll | false | boolean | false | boolean flag to trigger usage of Select All functionality text |
| selectAllData | false | `SQFormOption['value'][]` |  | array of items to put in the `name` array on 'select all' clickcallback |
| selectAllContainerProps | false | `GridProps` |  | props for the Grid container wrapping the select all checkbox |
| selectAllProps | false | `SQFormInclusionListItemProps` |  | props for the 'select all' SQFormInclusionListItem component |
