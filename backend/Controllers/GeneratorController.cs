using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860
//still need speeches from 21OCT
namespace donaldpls
{  
    [Route("api/[controller]")]
    public class Generator : Controller
    {
        private Dictionary<string, int> words = new Dictionary<string, int>();
        private Dictionary<string, List<string>> nGramModel = new Dictionary<string, List<string>>();
        private int wordCountTotal = 0;

        private MultiDeepMarkovChain markov = null;

        public void initializeMarkov(int d){
            markov = new MultiDeepMarkovChain(d);
            markov.feed(System.IO.File.ReadAllText("trumpus.txt"));
        }

        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            if(markov == null){
                initializeMarkov(3);
            }
            string text = "";
            for(int i =0; i < id; i++){
                text+=(" "+markov.generateSentence());
            }
            Speech speech = new Speech();
            speech.text = text;
            return Json(speech);
        }
    }

    class Speech{
        public string text {get; set;}
    }
}
