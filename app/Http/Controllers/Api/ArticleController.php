<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ArticlesRequest;
use App\Models\Article;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    use ApiResponser;

    public function store(ArticlesRequest $request)
    {
        //
        $articleAdd = Article::create([
            'title' => $request->title,
            'content' => $request->content,
            'category' => $request->category,
            'status' => $request->status
        ]);

        return response()->json((object)[]);
    }

    public function showAll(Article $article, $limit, $offset)
    {
        return $article->offset($offset)->limit($limit)->get([
            'title', 'content', 'category', 'status'
        ]);
    }

    public function showById(Article $article, $id)
    {
        return $article->findOrFail($id)->get([
            'title', 'content', 'category', 'status'
        ]);
    }

    public function updateById(ArticlesRequest $request, Article $article, $id)
    {
        $findArticle = $article->findOrFail($id);

        if ($findArticle) {
            $article->findOrFail($id)->update([
                'title' => $request->title,
                'content' => $request->content,
                'category' => $request->category,
                'status' => $request->status
            ]);

            return response()->json((object)[]);
        }
    }

    public function destroy(Article $article, $id)
    {
        $delete = $article->findOrFail($id)->delete();
        return;
    }
}
