var markdown = require('markdown').markdown, 
	fs = require('fs');

var envcheck = true;

exports.markdown = function(req, res){


  if(req.url === '/.plan') {
    file = 'plan.md';
  } else if(req.url === '/.project') {
    file = 'project.md';
  } /*else {
    res.status(404); 
    res.render("index", html = { title: '4(dada republic)4', error:'File not found' });
  }*/
  
  if(req.host === 'localhost') {
	envcheck = false; //if localhost don't include GA script
  }
  

  fs.readFile('public/markdown/'+file, {"encoding":"utf8"}, function(err, data){
    html = {
      title:'dada republic',
      body:markdown.toHTML(data),
      //UA: true,
      UA: envcheck,
      //UA: process.env.UA || null,
      domain: process.env.DOMAIN || null
    }
    res.render("index",html);
    res.end();
  });

};
