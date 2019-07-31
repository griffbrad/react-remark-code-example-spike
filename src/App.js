import React from 'react'
import PropTypes from 'prop-types'
import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'

import githubSchema from 'hast-util-sanitize/lib/github.json';

const schema = Object.assign({}, githubSchema, {
  attributes: Object.assign({}, githubSchema.attributes, {
    code: [
      ...(githubSchema.attributes.code || []),
      'className',
	  'lang'
    ]
  })
});

function CustomCode( props ) {
	console.log( props );

	return (
		<div>
			Hello.
		</div>
	);
}

CustomCode.propTypes = {
  className: PropTypes.string,
  lang: PropTypes.string,
  children: PropTypes.node
};

class App extends React.Component {
  constructor() {
    super()
    this.state = { text: "```jsx\n<Button />\n```" }
    this.onChange = this.onChange.bind(this)
  }
  onChange(e) {
    this.setState({ text: e.target.value })
  }
  render() {
    return (
      <div>
        <textarea value={this.state.text} onChange={this.onChange} />
        <div id="preview">
          {
            unified()
              .use(parse)
              .use(
			  	remark2react,
				{
					sanitize: schema,
					remarkReactComponents: {
						code: CustomCode
					}
				}
			  )
              .processSync(this.state.text).contents
          }
        </div>
      </div>
    )
  }
}

export default App;
