import React from "react";

const {PropTypes} = React;

const ArticleList = React.createClass({
    renderListItem (articles) {
        if(articles){
            return articles.map((article, index) => {
                return (
                    <div key={index} className="article-block" style={{width: "252px"}}>
                       <div className="article-img" style={{backgroundImage: "url(" + article.img + ")"}}></div>
                       <div className="article-detail">
                          <div className="article-title">
                             <div>{article.title}</div>
                          </div>
                          <div className="article-function">
                             <div><a target="_blank" href="http://bbc.com">Read story</a></div>
                             <div><a href="#">More news</a></div>
                          </div>
                       </div>
                    </div>
                );
            });
        }
    },
    render () {
        const {articles} = this.props;
        return (
            <div className="list-group">
                {this.renderListItem(articles)}
            </div>
        );
    }
});

export default ArticleList;
